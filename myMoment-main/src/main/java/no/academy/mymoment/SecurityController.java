package no.academy.mymoment;

import javax.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.validation.BindingResult;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.crypto.password.PasswordEncoder;

@Controller
public class SecurityController {

    private UserRepo userRepo;
    private PasswordEncoder encoder;

    public SecurityController(UserRepo userRepo, PasswordEncoder encoder) {
        this.userRepo = userRepo;
        this.encoder = encoder;
    }

    @GetMapping("/admin")
    public String secret() {
        return "adminProfileView";
    }

    @GetMapping("/login")
    public String login() {
        return "loginView";
    }

    @GetMapping("/signup")
    public String newUser(User user) {
        return "signupView";
    }

    @PostMapping("/signup")
    public String addNewUser(@Valid User user, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return "signupView";
        }
        try {
            if (user.getInputPassword().equals(user.getConfirmPassword())) {
                userRepo.save(new User(user.getUsername(), encoder.encode(user.getInputPassword()), user.getEmail()));
                return "redirect:/login";
            } else {
                bindingResult.rejectValue("confirmPassword", "password.notEqual");
                return "signupView";
            }
        } catch (DataIntegrityViolationException e) {
            bindingResult.reject("duplicate.field");
        }
        return "signupView";
    }
}
