const queryOptions = { active: true, currentWindow: true };

export const getCurrentTabUrl = async () => {
  try {
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  } catch (error) {
    console.log(error);
  }
};
