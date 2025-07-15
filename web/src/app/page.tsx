import ColorDemo from './ColorDemo';

export default function Home() {
  return (
    <main
      style={{
        padding: '2rem',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        color: 'white',
      }}>
      <h1
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          textAlign: 'center',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}>
        🚀 Iterative Development Environment - Ready!
      </h1>
      <p
        style={{
          fontSize: '1.2rem',
          marginBottom: '2rem',
          textAlign: 'center',
          opacity: '0.9',
        }}>
        This page demonstrates live hot-reload in action. Changes appear
        instantly!
      </p>
      <div
        style={{
          background: 'rgba(255,255,255,0.1)',
          padding: '2rem',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
        }}>
        <ColorDemo />
      </div>
    </main>
  );
}
