import React, { ReactChildren } from 'react';
import { useState, useEffect, useRef, CSSProperties } from 'react';

// Styles
import styles from "./styles.css";

interface BikeFeatureProps {
  title: string,
  image: string,
  shopButtonLink: string,
  moreButtonText: string,
  moreButtonLink: string
  children: ReactChildren
}

const BikeFeature: StorefrontFunctionComponent<BikeFeatureProps> = ({ title, image, shopButtonLink, moreButtonText, moreButtonLink, children }) => {
  const [openGate, setOpenGate] = useState<Boolean>(true);
  const closeButtonText = "Close";
  const classPrefix: string = "eriksbikeshop-bikefeature-1-x-";
  const [learnMoreButtonText, setLearnMoreButtonText] = useState<string>(moreButtonText || "Learn More");

  const floatContainer = useRef<any>(!null);
  const closeButton = useRef<any>(!null);
  const bikeFeatureContainer = useRef<any>(!null);
  const bikeSplit = useRef<any>(!null);
  const textSplit = useRef<any>(!null);

  useEffect(() => {
    if (openGate) {
      console.clear();
      setOpenGate(false);
    }
  })

  // VTEX adds a class prefix. This is a workaround - LM
  const newClass = (classSuffix: string) => classPrefix + classSuffix;

  const handleLearnMoreClick = () => {
    if (learnMoreButtonText === moreButtonText) {
      openInfo();
    } else {
      closeInfo();
    }
  }

  const handleCloseButton = () => {
    closeInfo();
  }

  const handleBackgroundClick = (e: any) => {
    if (e.target.id === "floatContainer") {
      if (learnMoreButtonText === closeButtonText) {
        closeInfo();
      }
    }
  }

  const openInfo = () => {
    bikeFeatureContainer.current.className = newClass("bikeFeatureContainerActive");
    closeButton.current.className = newClass("closeButtonActive");
    floatContainer.current.className = newClass("floatContainerActive");
    textSplit.current.className = newClass("textSplitActive");
    setLearnMoreButtonText(closeButtonText);
  }

  const closeInfo = () => {
    bikeFeatureContainer.current.className = newClass("bikeFeatureContainer");
    closeButton.current.className = newClass("closeButton");
    floatContainer.current.className = newClass("floatContainer");
    textSplit.current.className = newClass("textSplit");
    setLearnMoreButtonText(moreButtonText);
  }

  return (
    <div>
      <div id="floatContainer" ref={floatContainer} onClick={handleBackgroundClick} className={styles.floatContainer}>
        <div ref={closeButton} onClick={handleCloseButton} className={styles.closeButton}>X</div>
        <div className={styles.floatWrapper}>
          <div ref={bikeFeatureContainer} className={styles.bikeFeatureContainer}>
            <div className={styles.splitter}>
              <div ref={bikeSplit} className={styles.bikeSplit}>
                <h2 className={styles.bikeTitle}>{title}</h2>
                <div className={styles.imageContainer}>
                  <img className={styles.bikeImage} src={image} />
                </div>
                <div className={styles.buttonContainer}>
                  <a href={shopButtonLink} className={styles.redButton}>Shop {title}</a>
                  <div onClick={handleLearnMoreClick} className={styles.whiteButton}>{learnMoreButtonText}</div>
                </div>
              </div>
              <div ref={textSplit} className={styles.textSplit}>
                <div className={styles.descriptionWindow}>
                  <p className={styles.innerDescriptionText}>{children}</p>
                  <a href={moreButtonLink} target="_blank" rel="noreferrer" className={`${styles.whiteButton} ${styles.fullWidth}`}>{title} Buying Guide</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

BikeFeature.schema = {
  title: 'editor.bikefeature.title',
  description: 'editor.bikefeature.description',
  type: 'object',
  properties: {
    title: {
      title: "Title",
      description: "Title of Feature",
      type: "string"
    },

    // descriptionText: {
    //   title: "Description Text",
    //   description: "MD / Rich Text Not Supported",
    //   type: "string"
    // },

    image: {
      title: "Image Source",
      description: "Full Path to Image",
      type: "string"
    },

    shopButtonLink: {
      title: "Shop Button Link",
      description: "Full or Relative Path to Shop Link",
      type: "string"
    },

    moreButtonText: {
      title: "More Button Text",
      description: "More Button Text",
      type: "string",
      default: "Learn More"
    },

    moreButtonLink: {
      title: "More Button Link",
      description: "Full or Relative URL Path",
      type: "string"
    }
  }
}

export default BikeFeature;


// title: string,
//   image: string,
//   shopButtonLink: string,
//   moreButton: MoreButton