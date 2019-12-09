import React from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";

function PostCard({
  post: { body, createdAt, id, userName, likeCount, commentCount, likes }
}) {
  function likePost() {
    console.log("like post");
  }

  function commentPost() {
    console.log("comment post");
  }
  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{userName}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as="div" labelPosition="right" onClick={likePost}>
          <Button color="red" basic>
            <Icon name="heart" />
          </Button>
          <Label as="a" basic color="pink" pointing="left">
            {likeCount}
          </Label>
        </Button>
        <Button as="div" labelPosition="right" onClick={commentPost}>
          <Button color="blue" basic>
            <Icon name="comments" />
          </Button>
          <Label as="a" basic color="blue" pointing="right">
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
