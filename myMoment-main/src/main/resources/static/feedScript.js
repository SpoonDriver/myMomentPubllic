function populatePosts(lat, lng) {
    fetchPosts(lat, lng).then(posts => {
        let feedNode = document.getElementById("postFeed");
        feedNode.innerHTML = "";

        if (posts.length === 0) {
            let emptyFeedNode = document.createElement("p")
            emptyFeedNode.setAttribute("class", "emptyFeedText")
            emptyFeedNode.innerHTML = "There are no posts at this location. Be the first one to share something!"
            feedNode.append(emptyFeedNode);
        } else {

            for (let i = 0; i < posts.length; i++) {
                let post = posts[i];

                let postNode = document.createElement("div");
                postNode.setAttribute("class", "userPost");
                feedNode.append(postNode);

                let usernameNode = document.createElement("div");
                usernameNode.setAttribute("class", "username");
                usernameNode.innerHTML = post.user.username;

                let imgNode = document.createElement("img");
                imgNode.setAttribute("class", "userImage");
                imgNode.setAttribute("src", post.imgLink);

                let textFieldNode = document.createElement("div");
                textFieldNode.setAttribute("class", "userText");

                let textNode = document.createElement("p");
                textNode.innerHTML = post.imgText;
                textFieldNode.append(textNode);

                postNode.append(usernameNode, imgNode, textFieldNode);
            }
        }
    });
}

initPositionTracking(populatePosts);