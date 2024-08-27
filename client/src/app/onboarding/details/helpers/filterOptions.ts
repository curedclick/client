import { GpSurgery } from "../OnBoardingForm";

export const filterOptions = (
  options: GpSurgery[],
  { inputValue }: { inputValue: string }
) => {
  return options
    .filter((option) =>
      option.gpPracticeName.toLowerCase().includes(inputValue.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by relevance - how close the match is to the start of the string
      const aIndex = a.gpPracticeName
        .toLowerCase()
        .indexOf(inputValue.toLowerCase());
      const bIndex = b.gpPracticeName
        .toLowerCase()
        .indexOf(inputValue.toLowerCase());

      return aIndex - bIndex;
    });
};
