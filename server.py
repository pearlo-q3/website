import http.server
import socketserver

PORT = 5000

class ReusableServer(socketserver.TCPServer):
    allow_reuse_address = True

with ReusableServer(("0.0.0.0", PORT), http.server.SimpleHTTPRequestHandler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.serve_forever()
