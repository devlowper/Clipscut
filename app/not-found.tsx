export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-2">404 - Not Found</h1>
        <p className="text-gray-500 mb-4">The requested page could not be found.</p>
        <a href="/" className="button-primary">Go Home</a>
      </div>
    </div>
  );
}
