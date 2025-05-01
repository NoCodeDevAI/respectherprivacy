'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabaseClient';

interface Report {
  id: string;
  link: string;
  description: string;
  screenshot_url?: string;
}

export default function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      const { data, error } = await supabase.from('reported_links').select('*');
      if (!error) setReports(data || []);
      setLoading(false);
    };
    fetchReports();
  }, []);

  if (loading) return <p>Loading reports...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Recent Reports</h2>
      <div className="space-y-4">
        {reports.map((report) => (
          <div key={report.id} className="bg-gray-800 p-4 rounded">
            <p><strong>Link:</strong> <a href={report.link} target="_blank" rel="noopener noreferrer" className="text-accent-pink">{report.link}</a></p>
            <p><strong>Description:</strong> {report.description}</p>
            {report.screenshot_url && (
              <div className="relative w-full h-40 mt-2">
                <Image 
                  src={report.screenshot_url} 
                  alt="Screenshot" 
                  fill
                  className="object-cover rounded"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}