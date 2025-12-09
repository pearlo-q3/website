import http.server
import socketserver

ALLOWED_HOSTS = {
    'qubecatalyst.com',
    'www.qubecatalyst.com',
}

LOCALHOST_HOSTS = {'localhost', '127.0.0.1', '0.0.0.0'}

PORT = 5000

class SecureHandler(http.server.SimpleHTTPRequestHandler):
    def is_allowed(self):
        host = self.headers.get('Host', '').split(':')[0].lower()
        x_forwarded_host = self.headers.get('X-Forwarded-Host', '').split(':')[0].lower()
        
        print(f"Request - Host: {host}, X-Forwarded-Host: {x_forwarded_host}")
        
        if host in LOCALHOST_HOSTS and not x_forwarded_host:
            return True
        
        check_host = x_forwarded_host if x_forwarded_host else host
        
        if check_host in ALLOWED_HOSTS:
            return True
        
        if 'replit' in check_host or 'repl.co' in check_host:
            print(f"BLOCKED: {check_host}")
            return False
            
        return False

    def do_GET(self):
        if self.is_allowed():
            return super().do_GET()
        else:
            self.send_response(403)
            self.send_header('Content-type', 'text/plain')
            self.send_header('Cache-Control', 'no-store')
            self.end_headers()
            self.wfile.write(b'Forbidden - Access this site via qubecatalyst.com')
            return

    def do_HEAD(self):
        if self.is_allowed():
            return super().do_HEAD()
        else:
            self.send_response(403)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            return

class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReusableTCPServer(("0.0.0.0", PORT), SecureHandler) as httpd:
    print(f"Serving on port {PORT}")
    print(f"Only allowing: {ALLOWED_HOSTS}")
    print("Blocking all replit.app and repl.co domains")
    httpd.serve_forever()
