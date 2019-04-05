import moment from 'moment';

export const objectToArray = (object) => {
   if (object) {
      return Object.entries(object).map(e => Object.assign({ ...e[1] }, { id: e[0] }));
   }
};

export const createNewEvent = (user, photoURL, event) => {
   event.date = moment(event.date).toDate();

   return {
      ...event,
      hostUid: user.uid,
      hostedBy: user.displayName,
      hostPhotoURL: photoURL || '/assets/user.png',
      created: Date.now(),
      attendees: {
         [user.uid]: {
            going: true,
            joinDate: Date.now(),
            photoURL: photoURL || '/assets/user.png',
            displayName: user.displayName,
            host: true,
         },
      },
   };
};

export const createDataTree = (dataset) => {
   const hashTable = Object.create(null);
   dataset.forEach((a) => {
      hashTable[a.id] = { ...a, childNodes: [] };
   });
   const dataTree = [];
   dataset.forEach((a) => {
      if (a.parentId) {
         hashTable[a.parentId].childNodes.push(hashTable[a.id]);
      }
      else {
         dataTree.push(hashTable[a.id]);
      }
   });

   return dataTree;
};

const createCustomPropType = isRequired => (props, propName, componentName) => {
   const prop = props[propName];
   if (prop == null) {
      if (isRequired) {
         return new Error(
            `The prop ${propName} is marked as required in ${componentName}, but its value is undefined.`,
         );
      }
   }
   else if (typeof prop[`events/${props.match.params.id}`] !== 'boolean') {
      return new Error(
         `Invalid prop ${propName} supplied to ${componentName} Validation failed.`,
      );
   }
};

export const requestingPropType = createCustomPropType(false);
requestingPropType.isRequired = createCustomPropType(true);
