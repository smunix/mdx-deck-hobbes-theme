import React from "react";
import baseTheme from "mdx-deck/themes";
import syntaxTheme from "./tomorrow-prism-theme";
import prismReason from "react-syntax-highlighter/languages/prism/reason";
import prismHaskell from "react-syntax-highlighter/languages/prism/haskell";
import prismProlog from "react-syntax-highlighter/languages/prism/prolog";
import ThemeProvider from "mdx-deck/dist/Provider";
import { Notes, Code, components as deckComponents } from "mdx-deck";
import { convertTheme as toCodeSurferTheme } from "./codeSurferThemeConverter";
import { strong } from "./Strong";

const colorPrimary = "#39C0BA";

const SlideNumber = ({ number }) => (
  <div
    style={{
      position: "absolute",
      bottom: "1.5em",
      right: "1.5em"
    }}
  >
    <span style={{ color: colorPrimary }}>{number}</span>
  </div>
);

const HobbesLogo = _props => (
  <div
    style={{
      position: "absolute",
      top: "1.5em",
      right: "1.5em"
    }}
  >
    <img
      style={{ height: "5vmin", minHeight: "30px" }}
      src={require("./hobbes.jpg")}
    />
  </div>
);

const Provider = props => {
  const { children, ...rest } = props;

  return (
    <ThemeProvider {...rest}>
      {children}

      {props.mode == "NORMAL" && (
        <React.Fragment>
          {props.index > 0 && <SlideNumber number={props.index + 1} />}
          <HobbesLogo />
        </React.Fragment>
      )}
    </ThemeProvider>
  );
};

const codeSurferTheme = toCodeSurferTheme(syntaxTheme);
const makeCodeSurfer = LibCodeSurfer => props => {
  const syntaxThemeContainer = syntaxTheme['pre[class*="language-"]'];

  const updatedProps = {
    ...props,
    theme: codeSurferTheme
  };
  return (
    <React.Fragment>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      pre.prism-code code {
        background: ${syntaxThemeContainer.background};
        padding: ${syntaxThemeContainer.padding};
        border-radius: ${syntaxThemeContainer.borderRadius};
      }
    `
        }}
      />
      <LibCodeSurfer {...updatedProps} />
    </React.Fragment>
  );
};

export const makeCodeComponent = LibCodeSurfer => {
  const Header = deckComponents.h2;

  // based on https://github.com/pomber/code-surfer/blob/36a8157831f67dc731fba8de2e863f3cc7b55f7e/packages/mdx-deck-code-surfer/src/deck-components.js
  return props => {
    const { children, metaString, className } = props;
    const [src, steps] = children.split("\n----");
    const language = className.slice(9);

    if (steps) {
      return (
        <LibCodeSurfer
          code={src}
          steps={steps}
          title={() => <Header>{metaString}</Header>}
          lang={language}
        />
      );
    } else {
      return language === "notes" ? <Notes {...props} /> : <Code {...props} />;
    }
  };
};

const theme = {
  ...baseTheme,
  font: "Quicksand, sans-serif",
  prism: {
    style: syntaxTheme,
    languages: {
      reason: prismReason,
      haskell: prismHaskell,
      prolog: prismProlog
    }
  },
  colors: {
    ...baseTheme.colors,
    text: "#F0F0F0",
    background: "#22242A",
    link: "#296aff",
    code: colorPrimary
  },
  css: {
    ...baseTheme.css,
    // https://github.com/jxnblk/mdx-deck/pull/204
    "li > ul, li > ol": {
      fontSize: "inherit"
    },
    "li > p": {
      fontSize: "inherit",
      margin: 0
    }
  },
  heading: {
    color: colorPrimary,
    textAlign: "left"
  },
  li: {
    marginBottom: ".5em"
  },
  components: {
    strong: strong(colorPrimary)
  },
  Provider

  // Customize your presentation theme here.
  //
  // Read the docs for more info:
  // https://github.com/jxnblk/mdx-deck/blob/master/docs/theming.md
  // https://github.com/jxnblk/mdx-deck/blob/master/docs/themes.md
};

export const withCodeSurfer = LibCodeSurfer => {
  const CodeSurfer = makeCodeSurfer(LibCodeSurfer);

  return {
    ...theme,
    components: {
      ...theme.components,
      code: makeCodeComponent(CodeSurfer)
    }
  };
};

export default theme;
