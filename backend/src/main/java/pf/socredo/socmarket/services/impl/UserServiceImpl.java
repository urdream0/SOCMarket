package pf.socredo.socmarket.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import pf.socredo.socmarket.entity.UserEntity;
import pf.socredo.socmarket.repository.UserRepository;
import pf.socredo.socmarket.services.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public UserEntity getUserByLogin(String login) {
        return userRepository.findByLogin(login);
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserEntity getUserById(Long id) {
        Optional<UserEntity> user = userRepository.findById(id);
        return user.orElse(null);
    }
    @Override
    public UserEntity createUser(UserEntity user) {
        if (userRepository.findByLogin(user.getLogin()) != null) {
            throw new RuntimeException("L'utilisateur existe déjà !");
        }
    
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Le mot de passe ne peut pas être vide !");
        }
    
        System.out.println("🔑 Mot de passe AVANT hashage: " + user.getPassword());
    
        // ⚠️ Vérifie que le mot de passe n'est pas déjà haché
        if (!user.getPassword().startsWith("$2a$10$")) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            System.out.println("⚠️ Le mot de passe est déjà haché, pas besoin de le hacher à nouveau !");
        }
    
        System.out.println("🔒 Mot de passe APRÈS hashage: " + user.getPassword());
    
        return userRepository.save(user);
    }

    @Override
    public UserEntity updateUser(UserEntity user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public UserEntity authenticate(String login, String password) {
        UserEntity user = userRepository.findByLogin(login);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        }
        throw new RuntimeException("Identifiants incorrects !");
    }
}