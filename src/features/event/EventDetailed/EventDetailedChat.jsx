import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import distanceInWords from 'date-fns/distance_in_words';
import { Comment, Header, Segment } from 'semantic-ui-react';
import EventDetailedChatForm from './EventDetailedChatForm';

const EventDetailedChat = ({ addEventComment, eventChat, eventId }) => (
   <div>
      <Segment textAlign="center" attached="top" color="teal" inverted style={{ border: 'none' }}>
         <Header>Chat about this event</Header>
      </Segment>

      <Segment attached>
         <Comment.Group>
            {eventChat
               && eventChat.map(comment => (
                  <Comment key={comment.id}>
                     <Comment.Avatar src={comment.photoURL || '/assets/user.png'} />
                     <Comment.Content>
                        <Comment.Author as={Link} to={`/profile/${comment.uid}`}>
                           {comment.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                           <div>
                              {distanceInWords(comment.date, Date.now())}
                              {' '}
                              ago
                           </div>
                        </Comment.Metadata>
                        <Comment.Text>{comment.text}</Comment.Text>
                        <Comment.Actions>
                           <Comment.Action>Reply</Comment.Action>
                        </Comment.Actions>
                     </Comment.Content>
                  </Comment>
               ))}
         </Comment.Group>
         <EventDetailedChatForm addEventComment={addEventComment} eventId={eventId} />
      </Segment>
   </div>
);

EventDetailedChat.defaultProps = {
   eventId: '',
};

EventDetailedChat.propTypes = {
   addEventComment: PropTypes.func.isRequired,
   eventId: PropTypes.string,
};

export default EventDetailedChat;
