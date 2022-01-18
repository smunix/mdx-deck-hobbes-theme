export const convertTheme = theme => {
  const plainInput = theme['pre[class*="language-"]'];
  const themeKeys = Object.keys(theme).filter(
    key => !key.includes('class*="language-"')
  );

  const plain = {
    color: plainInput.color
  };

  const styles = themeKeys.map(key => {
    const value = theme[key];

    return {
      types: [key],
      style: value
    };
  });

  return {
    plain,
    styles
  };
};
