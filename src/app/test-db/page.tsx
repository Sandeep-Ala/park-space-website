import { supabase } from '@/lib/supabase'

export default async function TestDB() {
  const { data, error } = await supabase.from('services').select('*').limit(1)
  
  return (
    <div className="p-8">
      <h1>Database Connection Test</h1>
      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <p className="text-green-500">✅ Database connected successfully!</p>
      )}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}