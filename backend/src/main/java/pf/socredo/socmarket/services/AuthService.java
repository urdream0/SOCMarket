package pf.socredo.socmarket.services;

import pf.socredo.socmarket.dto.request.AuthRequest;
import pf.socredo.socmarket.dto.request.RegisterRequest;
import pf.socredo.socmarket.dto.response.AuthResponse;

public interface AuthService {
    AuthResponse login(AuthRequest request);
    AuthResponse register(RegisterRequest request);
}
