package vn.quanphan.realestate.domain;

import java.time.Instant;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import lombok.Setter;
import lombok.Getter;
import vn.quanphan.realestate.util.SecurityUtil;
import vn.quanphan.realestate.util.constant.AccountStatus;
import vn.quanphan.realestate.util.constant.Gender;

@Getter
@Setter
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;
    @NotBlank(message = "email không được để trống")
    private String email;

    @Column(columnDefinition = "TINYINT(1)")
    private boolean emailVerified;

    @NotBlank(message = "password không được để trống")
    private String password;
    private int age;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String address;
    private String phoneNumber;
    @Column(columnDefinition = "MEDIUMTEXT")
    private String refreshToken;
    @Enumerated(EnumType.STRING)
    private AccountStatus status;
    private String avatar;
    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    // @OneToOne
    // @JoinColumn(name = "specification_listing_page_id")
    // private SpecificationListingPage specificationListingPage;
    @PrePersist
    public void handleBeforeCreate() {
        this.createdBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedBy = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        this.updatedAt = Instant.now();
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public boolean getEmailVerified() {
        return this.emailVerified;
    }
}
