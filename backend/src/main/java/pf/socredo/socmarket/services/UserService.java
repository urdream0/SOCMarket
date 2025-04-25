package pf.socredo.socmarket.services;

import java.util.List;

import pf.socredo.socmarket.entity.UserEntity;

public interface UserService {
    UserEntity createUser(UserEntity user);
    UserEntity authenticate(String login, String password);
    UserEntity getUserByLogin(String login);
    UserEntity getUserById(Long id);
    List<UserEntity> getAllUsers();
    UserEntity updateUser(UserEntity user);
    void deleteUser(Long id);
}
