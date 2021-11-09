import React from 'react';
import MediaRow from './mediarow'
import * as nextImage from 'next/image';

export default{
    title:'components/mediarow',
    component: MediaRow,

    argTypes: {
        imgSize: {
          options: ['small-v','small-h','large-v','large-h'],
          control: { type: 'select' }
    },
    page: {
        options: ["default","genre"],
        control: { type: 'radio' }
  }
}
};

const Template = (args) => {
    return (
        <MediaRow {...args}/>
    )
}

export const Movies = Template.bind({});
Movies.args={
    mediatype:'movie',
    page:"default",
    title:"Movies",
    imgSize:"small-v",
    endpoint:"trending/movie/day??&language=en-US&sort_by=popularity.desc&include_video=true"
}

export const TVSeries = Template.bind({});
TVSeries.args={
    mediatype:'tv',
    page:"default",
    title:"TV Series",
    imgSize:"small-v",
    endpoint:"trending/tv/day??&language=en-US&sort_by=popularity.desc&include_video=true"
}
