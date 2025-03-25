import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  
  // Get parameters from the URL
  const title = searchParams.get('title') || 'PolarStock - AI-Powered Stock Image Generation';
  const description = searchParams.get('description') || 'Find, optimize, and download stock images for your projects';
  const type = searchParams.get('type') || 'website'; // can be 'article' or 'website'
  
  try {
    // Font
    const geistMedium = await fetch(
      new URL('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-500-normal.woff', import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    const geistBold = await fetch(
      new URL('https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff', import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#111827',
            backgroundImage: 'radial-gradient(circle at 25px 25px, #374151 2%, transparent 0%), radial-gradient(circle at 75px 75px, #374151 2%, transparent 0%)',
            backgroundSize: '100px 100px',
            padding: 50,
          }}
        >
          {/* Logo and badge */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="24" fill="#4F46E5" />
              <path d="M24 12L32 24L24 36L16 24L24 12Z" fill="white" />
            </svg>
            
            {type === 'article' && (
              <div 
                style={{ 
                  marginLeft: 16,
                  backgroundColor: '#4F46E5',
                  color: 'white',
                  padding: '4px 12px',
                  borderRadius: 9999,
                  fontSize: 16,
                  fontWeight: 'bold',
                }}
              >
                Blog Article
              </div>
            )}
          </div>
          
          {/* Title */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 48,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
              margin: '24px 0',
              lineHeight: 1.3,
              maxWidth: '80%', 
            }}
          >
            {title}
          </div>
          
          {/* Description */}
          <div
            style={{
              fontSize: 24,
              textAlign: 'center',
              color: '#D1D5DB',
              lineHeight: 1.4,
              maxWidth: '70%',
              marginBottom: 40,
            }}
          >
            {description}
          </div>
          
          {/* URL and divider line */}
          <div
            style={{
              position: 'absolute',
              bottom: 50,
              width: '80%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderTop: '1px solid #374151',
              paddingTop: 20,
            }}
          >
            <div
              style={{
                fontSize: 24,
                color: '#9CA3AF',
              }}
            >
              polarstock.vercel.app
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Geist',
            data: geistMedium,
            style: 'normal',
            weight: 500,
          },
          {
            name: 'Geist',
            data: geistBold,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate image: ${e.message}`, {
      status: 500,
    });
  }
} 