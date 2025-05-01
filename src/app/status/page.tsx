'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function StatusPage() {
  const [reportId, setReportId] = useState('');
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setStatus(null);

    try {
      const { data, error } = await supabase
        .from('reports')
        .select('*')
        .eq('report_identifier', reportId)
        .single();

      if (error) throw error;
      if (!data) {
        setError('No report found with this identifier.');
        return;
      }

      setStatus(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch report status. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="bg-background min-h-screen text-white py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-accent-pink to-muted-pink text-transparent bg-clip-text">
            Check Report Status
          </h1>
          <p className="text-xl text-gray-300">
            Enter your report identifier to check the current status of your submission.
          </p>
        </div>

        <div className="bg-black/30 p-8 rounded-xl border border-accent-pink/20 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="reportId" className="block text-soft-pink font-medium mb-2">
                Report Identifier
              </label>
              <input
                type="text"
                id="reportId"
                value={reportId}
                onChange={(e) => setReportId(e.target.value)}
                className="w-full p-3 rounded-lg bg-gray-800/70 border border-accent-pink/20 text-white placeholder-gray-400 focus:border-accent-pink focus:ring-1 focus:ring-accent-pink outline-none"
                placeholder="Enter your report identifier"
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-900/30 border border-red-500/30 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-accent-pink hover:bg-muted-pink text-white rounded-lg transition-all duration-300 flex justify-center items-center font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Checking...
                </>
              ) : (
                'Check Status'
              )}
            </button>
          </form>

          {status && (
            <div className="mt-8 p-6 bg-gray-800/50 rounded-lg border border-accent-pink/20">
              <h2 className="text-xl font-semibold mb-4 text-soft-pink">Report Status</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 mb-1">Status</p>
                  <p className="text-white font-medium">{status.status}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Submitted On</p>
                  <p className="text-white font-medium">
                    {new Date(status.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                {status.last_updated && (
                  <div>
                    <p className="text-gray-400 mb-1">Last Updated</p>
                    <p className="text-white font-medium">
                      {new Date(status.last_updated).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}