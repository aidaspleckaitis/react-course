import React from 'react';
import PropTypes from "prop-types"
import Section from './Section';
import SectionWithLists from './SectionWithLists';
import './index.css';
import data from "./data";

function Main(props) {

  const { language } = props;
  const { education, skills, experience, hobbies, reference } = data[language];

  return (
    <main className="Content">
      <Section
        title={education.title}
        descriptionTitle={education.descriptionTitle}
        info={education.info}
      />
      <Section
        title={skills.title}
        descriptionTitle={skills.descriptionTitle}
        info={skills.info}
      />
      <SectionWithLists
        title={experience.title}
        dataList={experience.info} />
      <Section
        title={hobbies.title}
        info={hobbies.info}
      />
      <Section
        title={reference.title}
        info={reference.info}
      />
    </main>
  );
}

Main.propTypes = {
  language: PropTypes.string.isRequired
}

export default Main;
