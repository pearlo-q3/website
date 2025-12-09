import http.server
import socketserver
import os

ALLOWED_HOSTS = {
    'qubecatalyst.com',
    'www.qubecatalyst.com',
    'localhost',
    '0.0.0.0',
    '127.0.0.1',
}

PORT = 5000

class SecureHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        host = self.headers.get('Host', '').split(':')[0]
        
        if host in ALLOWED_HOSTS or host.startswith('localhost') or host.startswith('127.'):
            return super().do_GET()
        else:
            self.send_response(403)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(b'Forbidden')
            return

    def do_HEAD(self):
        host = self.headers.get('Host', '').split(':')[0]
        
        if host in ALLOWED_HOSTS or host.startswith('localhost') or host.startswith('127.'):
            return super().do_HEAD()
        else:
            self.send_response(403)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            return

with socketserver.TCPServer(("0.0.0.0", PORT), SecureHandler) as httpd:
    print(f"Serving on port {PORT}")
    print(f"Allowed hosts: {ALLOWED_HOSTS}")
    httpd.serve_forever()
