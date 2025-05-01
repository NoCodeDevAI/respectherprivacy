import { supabase } from './supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export interface ReportData {
  harmful_link: string;
  experience: string;
  email?: string;
}

export interface ReportResponse {
  success: boolean;
  message?: string;
  data?: Array<{ report_identifier: string }>;
  isDuplicate?: boolean;
  debugInfo?: any;
}

// Environment check
const isDevelopment = process.env.NODE_ENV === 'development';

// Improved logger with type safety
function safeConsoleError(message: string, error: unknown) {
  if (!error) {
    console.error(message, 'No error details available');
    return;
  }
  
  if (error instanceof Error) {
    console.error(message, error.message, error.stack);
  } else if (typeof error === 'object') {
    console.error(message, JSON.stringify(error));
  } else {
    console.error(message, String(error));
  }
}

// More robust report ID generation
function generateReportId(): string {
  const timestamp = Date.now().toString(36).slice(-6).toUpperCase();
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return `RPT-${timestamp}-${randomPart}`;
}

// Comprehensive URL normalization
function normalizeUrl(url: string): string {
  if (!url.trim()) return '';

  try {
    // Add protocol if missing to properly parse
    const hasProtocol = url.match(/^https?:\/\//i);
    const parsedUrl = new URL(hasProtocol ? url : `https://${url}`);

    // Normalize components
    let hostname = parsedUrl.hostname.replace(/^www\./i, '').toLowerCase();
    let pathname = parsedUrl.pathname.replace(/\/+$/, '') || '/';
    pathname = pathname.replace(/\/+/g, '/'); // Collapse multiple slashes

    // Sort query parameters
    const queryParams = parsedUrl.searchParams;
    const sortedQuery = Array.from(queryParams.keys())
      .sort()
      .map(key => `${key}=${queryParams.get(key)}`)
      .join('&');

    // Reconstruct without protocol
    return `${hostname}${pathname}${sortedQuery ? `?${sortedQuery}` : ''}`;
  } catch (e) {
    safeConsoleError('URL normalization error:', e);
    // Fallback to basic normalization
    return url.toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/^www\./, '')
      .replace(/\/+$/, '')
      .replace(/\/+/g, '/');
  }
}

// Optimized duplicate check
async function checkForDuplicate(normalizedLink: string) {
  try {
    // First try exact match with ilike
    const { data: existing } = await supabase
      .from('reports')
      .select('report_identifier, harmful_link, created_at')
      .ilike('normalized_harmful_link', `%${normalizedLink.split('?')[0]}%`)
      .order('created_at', { ascending: false })
      .limit(5);

    if (!existing) return { isDuplicate: false };

    // Find the best normalized match
    const duplicate = existing.find(record => 
      record.harmful_link && normalizeUrl(record.harmful_link) === normalizedLink
    );

    return {
      isDuplicate: !!duplicate,
      existingId: duplicate?.report_identifier,
      existingRecord: duplicate
    };
  } catch (error) {
    safeConsoleError('Duplicate check error:', error);
    return { isDuplicate: false };
  }
}

// Helper for duplicate response
function createDuplicateResponse(existingId: string, normalizedLink: string): ReportResponse {
  return {
    success: false,
    isDuplicate: true,
    message: `This content has already been reported (ID: ${existingId}). Thank you for your vigilance.`,
    data: [{ report_identifier: existingId }],
    debugInfo: { normalizedLink }
  };
}

// Main report submission function
export async function submitReport(data: ReportData): Promise<ReportResponse> {
  try {
    // Validate input
    if (!data.harmful_link?.trim()) {
      return { success: false, message: 'Harmful link is required' };
    }

    // Normalize and check for duplicates
    const normalizedLink = normalizeUrl(data.harmful_link);
    const { isDuplicate, existingId } = await checkForDuplicate(normalizedLink);

    if (isDuplicate && existingId) {
      return createDuplicateResponse(existingId, normalizedLink);
    }

    // Generate ID and prepare data
    const reportId = generateReportId();
    const reportData = {
      report_identifier: reportId,
      harmful_link: data.harmful_link,
      normalized_harmful_link: normalizedLink,
      experience: data.experience,
      email: data.email?.trim() || null,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Development mock response
    if (isDevelopment && !process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.log('Mock submission:', reportData);
      await new Promise(resolve => setTimeout(resolve, 500));
      return { success: true, data: [{ report_identifier: reportId }] };
    }

    // Database insertion
    const { error } = await supabase
      .from('reports')
      .insert(reportData)
      .select();

    if (error) {
      // Handle unique constraint violation
      if (error.code === '23505') {
        const { existingId: duplicateId } = await checkForDuplicate(normalizedLink);
        if (duplicateId) {
          return createDuplicateResponse(duplicateId, normalizedLink);
        }
      }
      throw error;
    }

    return { success: true, data: [{ report_identifier: reportId }] };

  } catch (error) {
    safeConsoleError('Report submission failed:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit report'
    };
  }
}

// Enhanced report lookup
export async function getReportIdByLink(harmful_link: string): Promise<string> {
  if (!harmful_link?.trim()) return 'No link provided';

  try {
    const normalizedLink = normalizeUrl(harmful_link);
    const { existingId } = await checkForDuplicate(normalizedLink);

    if (existingId) return existingId;

    // Fallback search if no exact match
    const { data: similar } = await supabase
      .from('reports')
      .select('report_identifier, harmful_link')
      .ilike('harmful_link', `%${normalizedLink.split('/')[0]}%`)
      .limit(5);

    const match = similar?.find(r => 
      r.harmful_link && normalizeUrl(r.harmful_link) === normalizedLink
    );

    return match?.report_identifier || 'Not Found';
  } catch (error) {
    safeConsoleError('Report lookup error:', error);
    return 'Lookup Error';
  }
}