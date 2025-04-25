package pf.socredo.socmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import pf.socredo.socmarket.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    UserEntity findByLogin(String login);
}
