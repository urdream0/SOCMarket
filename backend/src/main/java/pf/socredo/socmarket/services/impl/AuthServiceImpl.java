package pf.socredo.socmarket.services.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pf.socredo.socmarket.dto.request.AuthRequest;
import pf.socredo.socmarket.dto.request.RegisterRequest;
import pf.socredo.socmarket.dto.response.AuthResponse;
import pf.socredo.socmarket.entity.UserEntity;
import pf.socredo.socmarket.repository.UserRepository;
import pf.socredo.socmarket.security.JwtUtil;
import pf.socredo.socmarket.services.AuthService;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponse login(AuthRequest request) {
        UserEntity user = userRepository.findByLogin(request.getLogin());

        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Identifiants incorrects !");
        }

        String token = jwtUtil.generateToken(user.getLogin());

        return new AuthResponse(token, user.getLogin(), user.getRole());
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByLogin(request.getLogin()) != null) {
            throw new RuntimeException("L'utilisateur existe déjà !");
        }

        String hashedPassword = passwordEncoder.encode(request.getPassword());

        UserEntity newUser = new UserEntity();
        newUser.setFirstName(request.getFirstName());
        newUser.setLastName(request.getLastName());
        newUser.setLogin(request.getLogin());
        newUser.setPassword(hashedPassword);
        newUser.setRole(request.getRole());

        userRepository.save(newUser);

        String token = jwtUtil.generateToken(newUser.getLogin());

        return new AuthResponse(token, newUser.getLogin(), newUser.getRole());
    }

}
