package vn.quanphan.realestate.domain.response;

import java.time.Instant;
import java.util.UUID;

import lombok.Getter;
import lombok.Setter;
import vn.quanphan.realestate.util.constant.Gender;

@Getter
@Setter
public class ResUpdateUserDTO {

    private UUID id;
    private String name;
    private Gender gender;
    private String address;
    private int age;
    private Instant updatedAt;
}
