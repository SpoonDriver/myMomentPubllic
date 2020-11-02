package no.academy.mymoment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyMomentApplication {

    private static DefaultUser defaultUser;
    public MyMomentApplication(DefaultUser defaultUser) {
        this.defaultUser = defaultUser;
    }

    public static void main(String[] args) {
        SpringApplication.run(MyMomentApplication.class, args);
        defaultUser.insertUser();
    }
}
