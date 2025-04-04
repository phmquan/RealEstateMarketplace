package vn.quanphan.realestate.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import vn.quanphan.realestate.domain.Role;
import vn.quanphan.realestate.domain.User;
import vn.quanphan.realestate.domain.response.ResCreateUserDTO;
import vn.quanphan.realestate.domain.response.ResRegisterUserDTO;
import vn.quanphan.realestate.domain.response.ResUpdateUserDTO;
import vn.quanphan.realestate.domain.response.ResUserDTO;
import vn.quanphan.realestate.domain.response.ResultPaginationDTO;
import vn.quanphan.realestate.domain.response.ResultPaginationDTO.Meta;
import vn.quanphan.realestate.repository.RoleRepository;
import vn.quanphan.realestate.repository.UserRepository;
import vn.quanphan.realestate.util.constant.AccountStatus;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    public User handleCreateUser(User user) {
        return this.userRepository.save(user);
    }

    public void handleDeleteUser(UUID id) {
        this.userRepository.deleteById(id);
    }

    public User fetchUserById(UUID id) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

    public ResultPaginationDTO fetchAllUser(Specification<User> spec, Pageable pageable) {
        Page<User> pageUser = this.userRepository.findAll(spec, pageable);
        ResultPaginationDTO rs = new ResultPaginationDTO();
        ResultPaginationDTO.Meta mt = new Meta();

        mt.setPage(pageable.getPageNumber() + 1);
        mt.setPageSize(pageable.getPageSize());

        mt.setPages(pageUser.getTotalPages());
        mt.setTotal(pageUser.getTotalElements());

        rs.setMeta(mt);

        // remove sensitive data
        List<ResUserDTO> listUser = pageUser.getContent()
                .stream().map(item -> new ResUserDTO(
                item.getId(),
                item.getEmail(),
                item.getName(),
                item.getGender(),
                item.getAddress(),
                item.getAge(),
                item.getUpdatedAt(),
                item.getCreatedAt()))
                .collect(Collectors.toList());

        rs.setResult(listUser);

        return rs;
    }

    public User handleUpdateUser(User reqUser) {
        User currentUser = this.fetchUserById(reqUser.getId());
        if (currentUser != null) {
            currentUser.setAddress(reqUser.getAddress());
            currentUser.setGender(reqUser.getGender());
            currentUser.setAge(reqUser.getAge());
            currentUser.setName(reqUser.getName());

            // update
            currentUser = this.userRepository.save(currentUser);
        }
        return currentUser;
    }

    public User handleGetUserByUsername(String username) {
        return this.userRepository.findByEmail(username);
    }

    public boolean isEmailExist(String email) {
        return this.userRepository.existsByEmail(email);
    }

    public boolean isPhoneNumberExist(String phoneNumber) {
        return this.userRepository.existsByPhoneNumber(phoneNumber);
    }

    public ResCreateUserDTO convertToResCreateUserDTO(User user) {
        ResCreateUserDTO res = new ResCreateUserDTO();
        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setName(user.getName());
        res.setAge(user.getAge());
        res.setCreatedAt(user.getCreatedAt());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        return res;
    }

    public ResUpdateUserDTO convertToResUpdateUserDTO(User user) {
        ResUpdateUserDTO res = new ResUpdateUserDTO();
        res.setId(user.getId());
        res.setName(user.getName());
        res.setAge(user.getAge());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        return res;
    }

    public ResUserDTO convertToResUserDTO(User user) {
        ResUserDTO res = new ResUserDTO();
        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setName(user.getName());
        res.setAge(user.getAge());
        res.setUpdatedAt(user.getUpdatedAt());
        res.setCreatedAt(user.getCreatedAt());
        res.setGender(user.getGender());
        res.setAddress(user.getAddress());
        return res;
    }

    public void updateUserToken(String token, String email) {
        User currentUser = this.handleGetUserByUsername(email);
        if (currentUser != null) {

            currentUser.setRefreshToken(token);
            this.userRepository.save(currentUser);

        }
    }

    public ResRegisterUserDTO convertToResRegisterUserDTO(User user) {
        ResRegisterUserDTO res = new ResRegisterUserDTO();
        res.setId(user.getId());
        res.setEmail(user.getEmail());
        res.setName(user.getName());
        res.setPhoneNumber(user.getPhoneNumber());
        res.setCreatedAt(user.getCreatedAt());

        return res;
    }

    public User getUserByRefreshTokenAndEmail(String token, String email) {
        return this.userRepository.findByRefreshTokenAndEmail(token, email);
    }

    public Role getRoleByName(String string) {
        return this.roleRepository.findByName(string);
    }

    public User getUserByEmail(String email) {
        return this.userRepository.findByEmail(email);
    }

    public String countExceptRole(Role roleName) {
        return this.userRepository.countByRoleNot(roleName);
    }

    public List<User> getAllUser(Pageable pageable) {
        return this.userRepository.findAll(pageable).getContent();
    }

    public User getUserById(String id) {
        return this.userRepository.findById(UUID.fromString(id)).get();
    }

    public void banUser(String id) {
        User user = this.getUserById(id);
        user.setStatus(AccountStatus.BANNED);
        this.userRepository.save(user);
    }
}
