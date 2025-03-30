package vn.quanphan.realestate.domain.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.quanphan.realestate.util.constant.Gender;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResUserDTO {

    private UUID id;
    private String email;
    private String name;
    private Gender gender;
    private String address;
    private int age;
    private Instant updatedAt;
    private Instant createdAt;
}
