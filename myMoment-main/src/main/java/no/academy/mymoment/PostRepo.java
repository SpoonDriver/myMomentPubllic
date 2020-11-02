package no.academy.mymoment;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.jpa.repository.Modifying;
import java.util.List;
import org.springframework.data.repository.CrudRepository;

public interface PostRepo extends CrudRepository<Post, Long> {

    @Query(value = "SELECT * FROM posts WHERE ST_DWithin(geom, cast(ST_MakePoint(:lat,:lng) AS geography), 50) ORDER BY id DESC;", nativeQuery = true)
    List<Post> findAllPostsInRange(@Param("lat") double lat, @Param("lng") double lng);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO posts (img_link, img_text, lat, lng, time, user_id, geom) VALUES (:imgLink, :imgText, :lat, :lng, :time, :user_id, ST_SetSRID(ST_MakePoint(:lat,:lng), 4326));", nativeQuery = true)
    void newPost(@Param("imgLink") String imgLink, @Param("imgText") String imgText, @Param("lat") double lat, @Param("lng") double lng, @Param("time") String time, @Param("user_id") User currentUser);

    List<Post> findAllByUserId(Long id);
}
