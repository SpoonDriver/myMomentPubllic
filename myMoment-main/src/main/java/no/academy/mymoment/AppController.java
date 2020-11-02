package no.academy.mymoment;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

@Controller
public class AppController {

    private UserRepo userRepo;
    private PostRepo postRepo;
    public AppController(UserRepo userRepo, PostRepo postRepo) {
        this.userRepo = userRepo;
        this.postRepo = postRepo;
    }

    @GetMapping("/")
    public String homeFeed() {
        return "feedView";
    }

    @GetMapping("/map")
    public String map() {
        return "mapView";
    }

    @GetMapping("/newpost")
    public String newPost() {
        return "uploadView";
    }

/*    @GetMapping("/filter")
    public String test() {
        return "filterView";
    }*/

    @GetMapping("/profile")
    public String profile(Model model) {
        UserDetails currentUserDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepo.findByUsername(currentUserDetails.getUsername());

        model.addAttribute("user", userRepo.findById(currentUser.getId()).get());
        model.addAttribute("posts", postRepo.findAllByUserId(currentUser.getId()));
        return "userProfileView";
    }
}
