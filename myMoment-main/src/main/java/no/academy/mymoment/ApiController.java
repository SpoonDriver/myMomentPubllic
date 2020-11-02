package no.academy.mymoment;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class ApiController {

    private PostRepo postRepo;
    public ApiController(PostRepo postRepo) {
        this.postRepo = postRepo;
    }

    @GetMapping("/api")
    public List<Post> test(@RequestParam Double lat, @RequestParam Double lng) {
        return postRepo.findAllPostsInRange(lat, lng);
    }

    @GetMapping(value = "/api", params = {"!lat", "!lng"})
    public List<Post> findAll() {
        return (List<Post>)postRepo.findAll();
    }
}
