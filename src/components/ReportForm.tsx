"use client";

import { useState, ChangeEvent, FormEvent, useEffect, useRef } from 'react';
import { submitReport, ReportData, getReportIdByLink } from '../lib/database';
import { FadeIn, SlideInFromRight, AnimatedButton } from './AnimatedElements';
import gsap from 'gsap';

// Helper function to normalize URLs - same as in database.ts
function normalizeUrl(url: string): string {
  try {
    // Remove trailing slashes and convert to lowercase for better matching
    return url.toLowerCase().trim().replace(/\/$/, '');
  } catch (e) {
    return url;
  }
}

export default function ReportForm() {
  const [formData, setFormData] = useState<ReportData>({
    harmful_link: '',
    experience: '',
    email: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reportId, setReportId] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [duplicateLink, setDuplicateLink] = useState('');
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [isDeepInspecting, setIsDeepInspecting] = useState(false);
  const [dbInspectionResult, setDbInspectionResult] = useState<any>(null);
  
  // Refs for animation
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const duplicateRef = useRef<HTMLDivElement>(null);

  // Animation for form fields
  useEffect(() => {
    if (!formRef.current) return;
    
    // Get all input elements
    const inputEls = formRef.current.querySelectorAll('input, textarea, button');
    
    // Create animation for staggered entrance
    gsap.fromTo(
      inputEls,
      { y: 20, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power2.out"
      }
    );
  }, []);
  
  // Animation for success/duplicate messages
  useEffect(() => {
    if (success && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
    
    if (isDuplicate && duplicateRef.current) {
      gsap.fromTo(
        duplicateRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [success, isDuplicate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: ReportData) => ({
      ...prev,
      [name]: value
    }));
  };

  // Special function to check for report ID directly
  const findReportId = async (link: string) => {
    if (!link) return;
    
    try {
      setIsDeepInspecting(true);
      console.log('Directly searching for link:', link);
      console.log('Normalized link:', normalizeUrl(link));
      const id = await getReportIdByLink(link);
      console.log('Direct search found:', id);
      
      if (id && id !== 'Not Found' && !id.includes('Error') && id !== 'Unknown field structure') {
        setReportId(id);
        return id;
      }
    } catch (err) {
      console.error('Error in direct report ID lookup:', err);
    } finally {
      setIsDeepInspecting(false);
    }
    return null;
  };

  // Function to do a deep inspection of the database
  const deepInspectDatabase = async () => {
    try {
      setIsDeepInspecting(true);
      
      // Direct database read using Supabase
      const { supabase } = await import('../lib/supabaseClient');
      
      // Get all records to see what's in the database
      // Use filter method instead of direct queries for URLs with special characters
      const { data: allRecords, error } = await supabase
        .from('reports')
        .select('*');
        
      if (error) {
        console.error('Error fetching all records:', error);
        setDbInspectionResult({ error: error.message });
        return;
      }
      
      console.log('All database records:', allRecords);
      
      // Get the field structure from the first record
      const fieldStructure = allRecords && allRecords.length > 0 
        ? Object.keys(allRecords[0]) 
        : [];
        
      // Check if any records match our current link
      const matchingRecords = allRecords?.filter(record => {
        if (!record.harmful_link || !duplicateLink) return false;
        // Try different normalization strategies
        const normalizedRecord = normalizeUrl(record.harmful_link);
        const normalizedCurrent = normalizeUrl(duplicateLink);
        
        // More comprehensive matching approach
        return normalizedRecord === normalizedCurrent || 
               record.harmful_link.includes(duplicateLink) ||
               duplicateLink.includes(record.harmful_link) ||
               // Match URLs without protocol (http:// or https://)
               normalizedRecord.replace(/^https?:\/\//, '') === normalizedCurrent.replace(/^https?:\/\//, '');
      });
      
      // Prepare the inspection result
      const result = {
        totalRecords: allRecords?.length || 0,
        fieldStructure,
        matchingRecords: matchingRecords || [],
        normalizedCurrentLink: normalizeUrl(duplicateLink),
        possibleMatches: allRecords?.map(r => ({
          id: r.id,
          report_identifier: r.report_identifier,
          harmful_link: r.harmful_link,
          normalized: normalizeUrl(r.harmful_link || ''),
          withoutProtocol: normalizeUrl(r.harmful_link || '').replace(/^https?:\/\//, '')
        }))
      };
      
      setDbInspectionResult(result);
      
      // If we found matches, use the first one's ID
      if (matchingRecords && matchingRecords.length > 0) {
        const match = matchingRecords[0];
        if (match.report_identifier) {
          setReportId(match.report_identifier);
          return match.report_identifier;
        } else if (match.id) {
          const formattedId = `RPT-${match.id}`;
          setReportId(formattedId);
          return formattedId;
        }
      }
      
    } catch (err) {
      console.error('Error in deep database inspection:', err);
      setDbInspectionResult({ error: String(err) });
    } finally {
      setIsDeepInspecting(false);
    }
    return null;
  };

  // If we have a duplicate link but no report ID, try to find it
  useEffect(() => {
    if (isDuplicate && duplicateLink && !reportId) {
      findReportId(duplicateLink);
    }
  }, [isDuplicate, duplicateLink, reportId]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setIsDuplicate(false);
    setDuplicateLink('');
    setReportId('');
    setDebugInfo(null);
    setDbInspectionResult(null);
    setLoading(true);
    
    try {
      // Validate form data
      if (!formData.harmful_link) {
        throw new Error('Please provide the harmful content link');
      }
      
      if (!formData.experience) {
        throw new Error('Please describe your experience');
      }
      
      console.log('Submitting report...');
      console.log('Original link:', formData.harmful_link);
      console.log('Normalized link:', normalizeUrl(formData.harmful_link));
      
      const result = await submitReport(formData);
      console.log('Result from submission:', result);
      
      // Store debug info if available
      if (result.debugInfo) {
        setDebugInfo(result.debugInfo);
        console.log('Debug info from result:', result.debugInfo);
      }
      
      if (result.success) {
        setSuccess(true);
        setFormData({
          harmful_link: '',
          experience: '',
          email: ''
        });
        
        if (result.data && result.data[0]) {
          setReportId(result.data[0].report_identifier);
        }
      } else if (result.isDuplicate) {
        // Handle duplicate submission
        setIsDuplicate(true);
        setDuplicateLink(formData.harmful_link);
        
        // Ensure we set the report ID if available
        if (result.data && result.data[0] && result.data[0].report_identifier) {
          console.log('Setting duplicate report ID to:', result.data[0].report_identifier);
          setReportId(result.data[0].report_identifier);
        } else {
          console.log('No report ID found in result data, trying to find it');
          // Find it directly
          const directId = await findReportId(formData.harmful_link);
          if (directId) {
            setReportId(directId);
          } else {
            setReportId('Not Found');
          }
        }
        
        setError(result.message || 'This link has already been reported.');
      } else {
        setError(result.message || 'Failed to submit report. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Error in form submission:', err);
      setError(err instanceof Error ? err.message : 'Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setSuccess(false);
    setIsDuplicate(false);
    setError('');
    setReportId('');
    setDuplicateLink('');
    setDebugInfo(null);
    setDbInspectionResult(null);
    setFormData({
      harmful_link: '',
      experience: '',
      email: ''
    });
  };

  // Function to try to get report ID from debug info
  const getReportIdFromDebugInfo = () => {
    if (!debugInfo) return null;
    
    // Try different possible field names
    if (debugInfo.report_identifier) return debugInfo.report_identifier;
    if (debugInfo.reportidentifier) return debugInfo.reportidentifier;
    if (debugInfo.report_id) return debugInfo.report_id;
    if (debugInfo.id) return `RPT-${debugInfo.id}`;
    if (debugInfo.debug_id) return debugInfo.debug_id;
    
    // If nothing found in the object directly
    return null;
  };

  // Get and set the report ID from debug info if available
  useEffect(() => {
    if (debugInfo && !reportId) {
      const idFromDebug = getReportIdFromDebugInfo();
      if (idFromDebug) {
        console.log('Setting report ID from debug info:', idFromDebug);
        setReportId(idFromDebug);
      }
    }
  }, [debugInfo, reportId]);

  return (
    <FadeIn className="bg-[#1A1A1A] border border-gray-800 rounded-lg shadow-xl p-6 sm:p-8 relative overflow-hidden">
      {/* Decorative elements with animation */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-accent-pink rounded-full filter blur-[80px] opacity-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-muted-pink rounded-full filter blur-[80px] opacity-10 animate-pulse"></div>
      
      {success ? (
        <SlideInFromRight className="bg-[#1E2A1E] border border-green-700 text-green-400 px-6 py-5 rounded-lg" ref={successRef}>
          <p className="text-lg font-medium">Your report has been submitted successfully.</p>
          {reportId && <p className="mt-3">Your report ID: <strong className="text-green-300">{reportId}</strong></p>}
          <p className="mt-2 text-sm text-green-300/80">Please save this ID for future reference.</p>
          <AnimatedButton className="mt-5">
            <button 
              onClick={resetForm}
              className="px-6 py-2.5 bg-accent-pink text-white rounded-full hover:bg-muted-pink transition shadow-pink"
            >
              Submit Another Report
            </button>
          </AnimatedButton>
        </SlideInFromRight>
      ) : isDuplicate ? (
        <SlideInFromRight className="bg-[#2A251E] border border-yellow-700 text-yellow-400 px-6 py-5 rounded-lg" ref={duplicateRef}>
          <p className="text-lg font-medium">This content has already been reported.</p>
          <p className="mt-2 text-sm">
            <span className="text-yellow-300 font-semibold">Link:</span> 
            <span className="text-yellow-200 break-all"> {duplicateLink}</span>
          </p>
          
          <p className="mt-2">
            <span className="text-yellow-300 font-semibold">Existing report ID:</span> 
            <strong className="text-yellow-200 ml-2">
              {isDeepInspecting ? 'Searching database...' : (reportId || 'Not Found')}
            </strong>
            
            {/* Retry button in case report ID is not found */}
            {reportId === 'Not Found' && !isDeepInspecting && (
              <button 
                onClick={() => findReportId(duplicateLink)}
                className="ml-2 px-2 py-1 text-xs bg-yellow-800 text-yellow-200 rounded hover:bg-yellow-700 transition"
                disabled={isDeepInspecting}
              >
                Retry
              </button>
            )}
            
            {/* Deep inspection button for troubleshooting */}
            {reportId === 'Not Found' && !isDeepInspecting && (
              <button 
                onClick={deepInspectDatabase}
                className="ml-2 px-2 py-1 text-xs bg-blue-800 text-blue-200 rounded hover:bg-blue-700 transition"
                disabled={isDeepInspecting}
              >
                Deep Scan
              </button>
            )}
          </p>
          
          <p className="mt-2 text-sm text-yellow-300/80">Thank you for your vigilance. We're already reviewing this content.</p>
          <AnimatedButton className="mt-5">
            <button 
              onClick={resetForm}
              className="px-6 py-2.5 bg-accent-pink text-white rounded-full hover:bg-muted-pink transition shadow-pink"
            >
              Report Different Content
            </button>
          </AnimatedButton>
          
          {/* Debug information - only showing in specific situations */}
          {isDuplicate && reportId === 'Not Found' && !isDeepInspecting && (debugInfo || dbInspectionResult) && (
            <div className="mt-4 p-3 bg-black/30 rounded-md text-xs text-yellow-200/70 overflow-auto">
              {debugInfo && (
                <div className="mb-2">
                  <p className="font-semibold mb-1">Debug Info:</p>
                  <pre className="font-mono text-[10px] whitespace-pre-wrap overflow-x-auto">
                    {JSON.stringify(debugInfo, null, 2)}
                  </pre>
                </div>
              )}
              
              {dbInspectionResult && (
                <div>
                  <p className="font-semibold mb-1">Database Inspection:</p>
                  <p>Total Records: {dbInspectionResult.totalRecords}</p>
                  <p>Matching Records: {dbInspectionResult.matchingRecords?.length || 0}</p>
                  
                  {dbInspectionResult.matchingRecords?.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">Matching Record:</p>
                      <pre className="font-mono text-[10px] whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(dbInspectionResult.matchingRecords[0], null, 2)}
                      </pre>
                    </div>
                  )}
                  
                  {dbInspectionResult.fieldStructure?.length > 0 && (
                    <p className="mt-1">
                      Fields: {dbInspectionResult.fieldStructure.join(', ')}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </SlideInFromRight>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" ref={formRef}>
          {error && (
            <div className="bg-[#2A1E1E] border border-red-700 text-red-400 px-6 py-4 rounded-lg">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="harmful_link" className="block text-soft-pink font-medium mb-2">
              Harmful Content Link <span className="text-accent-pink">*</span>
            </label>
            <input
              type="url"
              id="harmful_link"
              name="harmful_link"
              value={formData.harmful_link}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink text-white"
              placeholder="https://example.com/harmful-content"
              required
            />
            <p className="text-sm text-gray-400 mt-1.5">
              Enter the full URL where the harmful content is located
            </p>
          </div>
          
          <div>
            <label htmlFor="experience" className="block text-soft-pink font-medium mb-2">
              Your Experience <span className="text-accent-pink">*</span>
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              rows={5}
              className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink text-white resize-none"
              placeholder="Please describe your experience with this content and why you're reporting it"
              required
              suppressHydrationWarning
            ></textarea>
            <p className="text-sm text-gray-400 mt-1.5">
              Please provide details about the content and why you believe it should be removed
            </p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-soft-pink font-medium mb-2">
              Email (Optional)
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#2A2A2A] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-pink text-white"
              placeholder="your.email@example.com"
            />
            <p className="text-sm text-gray-400 mt-1.5">
              We'll only use this to follow up on your report if necessary. You can leave this blank to remain anonymous.
            </p>
          </div>
          
          <div className="bg-[#1E2A2A] border border-blue-900/40 p-4 rounded-lg">
            <p className="text-sm text-blue-300">
              <strong className="text-soft-pink">Privacy Note:</strong> Your report is anonymous by default unless you provide an email address. 
              We generate a unique report ID for you to track your report status.
            </p>
          </div>
          
          <AnimatedButton className="w-full">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-full font-medium shadow-pink transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-pink ${
                loading ? 'bg-accent-pink/50 cursor-not-allowed' : 'bg-accent-pink hover:bg-muted-pink'
              } text-white`}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </AnimatedButton>
        </form>
      )}
    </FadeIn>
  );
} 