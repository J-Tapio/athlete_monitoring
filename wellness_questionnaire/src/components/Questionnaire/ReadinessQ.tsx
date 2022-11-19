import { useState, Dispatch, SetStateAction } from "react";
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
  Button,
  useToast,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
// Types
import {
  Categories,
  AnswerOptions,
  CategoryAndOptions,
  Publication,
} from "../../types/readiness_questionnaire";
// BodyMap
import BodyMap from "../BodyComponent/Body";
//============================================================================//

// Questionnaire author and publication
const publication: Publication = {
  link: "https://www.semanticscholar.org/paper/Neuromuscular,-endocrine,-and-perceptual-fatigue-in-McLean-Coutts/81b8118dc6d5ffc4a967b6e758c6d79010e738a8",
  authorAndTitle:
    "McLean et al. (2010). Neuromuscular, Endocrine, and Perceptual Fatigue Responses during Different Length Between-Match Microcycles in Professional Rugby League Players. International Journal of Sports Physiology and Performance, 5(3), 367–383. doi:10.1123/ijspp.5.3.367",
};

// Category related options
const fatigue: AnswerOptions = {
  1: "Always tired",
  2: "More tired than normal",
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
};
const sleepQuality: AnswerOptions = {
  1: "Insomnia",
  2: "Restless sleep",
  3: "Difficulty falling asleep",
  4: "Good",
  5: "Very restful",
};
const stress: AnswerOptions = {
  1: "Highly stressed",
  2: "Feeling stressed",
  3: "Normal",
  4: "Relaxed",
  5: "Very relaxed",
};
const mood: AnswerOptions = {
  1: "Highly annoyed / irritable / down",
  2: "Snappy with team-mates, family and friends",
  3: "Less interested in other activities",
  4: "Generally good mood",
  5: "Very positive mood",
};

const categoryAndOptions: CategoryAndOptions[] = [
  { category: "Fatigue", answerOptions: fatigue },
  { category: "Muscle Soreness", answerOptions: muscleSoreness },
  { category: "Sleep Quality", answerOptions: sleepQuality },
  { category: "Stress", answerOptions: stress },
  { category: "Mood", answerOptions: mood },
];
//============================================================================//
type QuestionnaireProps = {
  adjustQResult: Dispatch<SetStateAction<number>>;
  category: Categories;
  answerOptions: AnswerOptions;
}

function ReadinessQuestion({category, answerOptions, adjustQResult}: QuestionnaireProps) {
  const [val, setVal] = useState<number>(3);

  function handleValueChange(
    selectedVal: number,
  ) {
    setVal(selectedVal);
    adjustQResult((currentResult) => {
      if(selectedVal < 3) {
        return currentResult - (val - selectedVal);
      }
      if(selectedVal > 3) {
        return currentResult + (selectedVal - val)
      }
      return currentResult - (val - 3);
    });
  }

  return (
    <Flex
      gap={["1.6rem", "2rem"]}
      alignItems="center"
      height={["5rem"]}
      flexDirection={["column", "row"]}
    >
      <Text
        width={["100%", "20%"]}
        textTransform="uppercase"
        fontWeight="500"
        fontSize={["md", "md", "md", "lg"]}
      >
        {category}
      </Text>
      <Divider orientation="vertical" />
      <Slider
        aria-label="category-slider"
        defaultValue={3}
        min={1}
        max={5}
        step={1}
        colorScheme="teal"
        width={["100%", "70%"]}
        onChange={handleValueChange}
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
            hidden={val == sliderValue ? false : true} // Comment out if all selectable numeric values should be shown
          >
            {sliderValue}
          </SliderMark>
        ))}
        <SliderTrack bg="gray.300">
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal"
          color="white"
          placement="top"
          isOpen={true}
          marginBlockEnd="1"
          fontSize={["0.8rem", "0.9rem", "0.95rem"]}
          label={answerOptions[val]}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    </Flex>
  );
}
//============================================================================//
function AuthorPublication({ link, authorAndTitle }: Publication) {
  return (
    <Link href={link} isExternal>
      <Text as="cite">{authorAndTitle}</Text>
      <ExternalLinkIcon mx="2px" />
    </Link>
  );
}
//============================================================================//
function SubmitQ({result}:{result:number}) {
  const submitToast = useToast();
  function handleSubmit() {
    // Handler function to submit questionnaire results within database etc.
    // function submitData() {...}
    // Handle submit toast information/color accordingly if submission of data to database/server fails for some reason
    return submitToast({
      //position: "top", "top-right", "top-left", "bottom", "bottom-right","bottom-left",
      //status: 'success', 'error', 'warning', 'info',
      title: `Questionnaire answers submitted! - Result: ${result}`, //Omit result - just for showcase to see calculation total
      description:
        "A staff member will be in touch soon if further discussion is needed with you. You can also be in contact with staff member of the team to further discuss about your situation. Don't hesitate to be in contact - Team is here to support you always!",
      status: "success",
      duration: 20000,
      isClosable: true,
    });
  }

  return (
    <Button 
    colorScheme="teal"
    width="60%" 
    alignSelf="center"
    onClick={handleSubmit}
    >
      Submit
    </Button>
  );
}

//============================================================================//
export default function ReadinessQ() {
  //Questionnaire result by default 15 (five questions, all set to value of three) = 15.
  const [qResult, adjustQResult] = useState<number>(15);
  return (
    <Box m="2rem" pt="2">
      <Stack direction={"column"} spacing={["5rem", "3.5rem"]}>
        <Heading as="h2" textAlign="center">
          Subjective wellness questionnaire
        </Heading>
        {categoryAndOptions.map(({ category, answerOptions }) => (
          <ReadinessQuestion
            key={category}
            category={category}
            answerOptions={answerOptions}
            adjustQResult={adjustQResult}
          />
        ))}
        <AuthorPublication
          link={publication.link}
          authorAndTitle={publication.authorAndTitle}
        />
        <BodyMap />
        <SubmitQ result={qResult} />
      </Stack>
    </Box>
  );
}
