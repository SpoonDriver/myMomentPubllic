package no.academy.mymoment;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class DefaultUser {

    private UserRepo userRepo;
    private PasswordEncoder encoder;


    public DefaultUser(UserRepo userRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    public void insertUser() {
        userRepo.save(new User("user", encoder.encode("123456"), "hei@gmail.no"));
        userRepo.save(new User("Ingvild", encoder.encode("123456"), "email@email.com"));
    }
}
