package vn.quanphan.realestate.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import vn.quanphan.realestate.domain.Role;
import vn.quanphan.realestate.domain.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {

    List<User> findAll();

    User findByEmail(String email);

    Boolean existsByEmail(String email);

    User findByRefreshTokenAndEmail(String token, String email);

    boolean existsByPhoneNumber(String phoneNumber);

    String countByRoleNot(Role role);

}
