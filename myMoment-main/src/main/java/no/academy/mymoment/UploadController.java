package no.academy.mymoment;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
public class UploadController {

    private PostRepo postRepo;
    private UserRepo userRepo;
    private AmazonClient amazonClient;

    UploadController(PostRepo postRepo, UserRepo userRepo, AmazonClient amazonClient) {
        this.postRepo = postRepo;
        this.userRepo = userRepo;
        this.amazonClient = amazonClient;
    }

    @PostMapping("/upload")
    public void uploadFile(@RequestPart(value = "file") MultipartFile file, @RequestParam String imgText, @RequestParam Double lat, @RequestParam Double lng, @RequestParam String time) {

        UserDetails currentUserDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepo.findByUsername(currentUserDetails.getUsername());

        String imgLink = this.amazonClient.uploadFile(file);
        postRepo.newPost(imgLink, imgText, lat, lng, time, currentUser);
    }

    @PostMapping("/uploadProfileImage")
    public void uploadProfileImage(@RequestPart(value = "file") MultipartFile file) {

        UserDetails currentUserDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        User currentUser = userRepo.findByUsername(currentUserDetails.getUsername());

        String profileImg = this.amazonClient.uploadFile(file);
        currentUser.setProfileImg(profileImg);
        userRepo.save(currentUser);
    }

    @DeleteMapping("/delete")
    public String deleteFile(@RequestPart(value = "url") String fileUrl) {
        return this.amazonClient.deleteFileFromS3Bucket(fileUrl);
    }
}