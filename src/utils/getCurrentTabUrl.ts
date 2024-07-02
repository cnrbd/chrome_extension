export const getCurrentTabUrl = async () => {
  const tab = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log(tab);
};
