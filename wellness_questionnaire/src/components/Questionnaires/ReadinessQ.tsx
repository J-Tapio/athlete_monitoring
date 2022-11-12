import { useState } from "react";
// ChakraUI
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Text,
  Box,
  Divider,
  Flex,
  Stack,
  Tooltip,
  Heading,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
// Types
import { AnswerOptions, CategoryAndOptions, Publication } from "../../types/readiness_questionnaire";
//============================================================================//

// Questionnaire author and publication
const publication: Publication = {
  link: "https://www.semanticscholar.org/paper/Neuromuscular,-endocrine,-and-perceptual-fatigue-in-McLean-Coutts/81b8118dc6d5ffc4a967b6e758c6d79010e738a8",
  authorAndTitle: "McLean et al. (2010). Neuromuscular, Endocrine, and Perceptual Fatigue Responses during Different Length Between-Match Microcycles in Professional Rugby League Players. International Journal of Sports Physiology and Performance, 5(3), 367–383. doi:10.1123/ijspp.5.3.367"
};


// Category related options
const fatigue: AnswerOptions = {
  1: "Always tired",
  2: "More tided than normal",
  3: "Normal",
  4: "Fresh",
  5: "Very fresh",
};
const muscleSoreness: AnswerOptions = {
  1: "Very sore",
  2: "More tired than normal",
  3: "Normal",
  4: "Feeling good",
  5: "Feeling great",
}
const sleepQuality: AnswerOptions = {
  1: "Insomnia",
  2: "Restless sleep",
  3: "Difficulty falling asleep",
  4: "Good",
  5: "Very restful",
}
const stress: AnswerOptions = {
  1: "Highly stressed",
  2: "Feeling stressed",
  3: "Normal",
  4: "Relaxed",
  5: "Very relaxed",
}
const mood: AnswerOptions = {
  1: "Highly annoyed / irritable / down",
  2: "Snappy with team-mates, family and friends",
  3: "Less interested in other activities",
  4: "Generally good mood",
  5: "Very positive mood",
}

const categoryAndOptions:CategoryAndOptions[] = [
  {category: "Fatigue", answerOptions: fatigue},
  {category: "Muscle Soreness", answerOptions: muscleSoreness},
  {category: "Sleep Quality", answerOptions: sleepQuality},
  {category: "Stress", answerOptions: stress},
  {category: "Mood", answerOptions: mood},
];
//============================================================================//

function ReadinessQuestion({category, answerOptions}:CategoryAndOptions) {
  const [val, setVal] = useState<number>(3);
  return (
    <Flex gap={["1.6rem","2rem"]} alignItems="center" height={["5rem"]} flexDirection={["column", "row"]}>
      <Text width={["100%","20%"]} textTransform="uppercase" fontWeight="500" fontSize={["md","md", "md", "lg"]}>
        {category}
      </Text>
      <Divider orientation="vertical"/>
      <Slider
        aria-label="fatigue-slider"
        defaultValue={3}
        min={1}
        max={5}
        step={1}
        colorScheme="teal"
        width={["100%","70%"]}
        onChange={(val) => setVal(val)}
      >
        {[1, 2, 3, 4, 5].map((sliderValue) => (
          <SliderMark
            key={sliderValue}
            value={sliderValue}
            style={{
              paddingTop: "1rem",
              marginLeft: "-4.5px",
              fontWeight: "500",
              fontSize: "1.2rem",
            }}
            hidden={val == sliderValue ? false : true}
          >
            {sliderValue}
          </SliderMark>
        ))}
        <SliderTrack bg="gray.300">
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={true}
          marginBlockEnd="1"
          fontSize={["0.8rem","0.9rem", "0.95rem"]}
          label={answerOptions[val]}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Flex>
  );
}
//============================================================================//
function AuthorPublication({link, authorAndTitle}:Publication) {
  return (
    <Link
      href={link}
      isExternal
    >
      <Text as="cite">{authorAndTitle}</Text>
      <ExternalLinkIcon mx="2px" />
    </Link>
  );
}

//============================================================================//
export default function ReadinessQ() {
  return (
    <Box m="2rem" pt="2">
      <Stack direction={"column"} spacing={["5rem", "3.5rem"]}>
        <Heading as="h2" textAlign="center">Subjective wellness questionnaire</Heading>
        {categoryAndOptions.map(({ category, answerOptions }) => (
          <ReadinessQuestion
            key={category}
            category={category}
            answerOptions={answerOptions}
          />
        ))}
        <AuthorPublication link={publication.link} authorAndTitle={publication.authorAndTitle}/>
      </Stack>
    </Box>
  );
}
