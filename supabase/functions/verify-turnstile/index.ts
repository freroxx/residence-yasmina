import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { token } = await req.json()
    
    if (!token) {
      throw new Error('Token manquant')
    }

    const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY')
    
    if (!TURNSTILE_SECRET_KEY) {
      throw new Error('Clé secrète Turnstile non configurée')
    }

    // Verify the token with Cloudflare
    const formData = new FormData()
    formData.append('secret', TURNSTILE_SECRET_KEY)
    formData.append('response', token)

    const verifyResponse = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    )

    const outcome = await verifyResponse.json()

    return new Response(
      JSON.stringify({ success: outcome.success }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue'
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})