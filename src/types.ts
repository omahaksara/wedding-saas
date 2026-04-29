export interface WeddingData {
  slug: string;
  config: {
    theme: string;
    audioUrl: string;
    isLocked: boolean;
  };
  couple: {
    groom: Person;
    bride: Person;
  };
  events: Event[];
  gallery: {
    heroImage: string;
    videoYoutubeId: string;
    album: string[];
  };
  loveStory: Story[];
  digitalGift: Gift[];
  logistics: {
    dressCode: string;
    rsvpWaNumber: string;
    guestNote: string;
  };
}

interface Person {
  name: string;
  nickname: string;
  father: string;
  mother: string;
  instagram: string;
  image: string;
}

interface Event {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  timezone: string;
  address: string;
  googleMaps: string;
}

interface Story {
  year: string;
  title: string;
  desc: string;
}

interface Gift {
  provider: string;
  accountNumber: string;
  accountHolder: string;
  qrCode: string;
}
