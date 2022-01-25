// import styled from "styled-components/macro";
import invariant from "tiny-invariant";

export default function GoBackToTopLink() {
  return (
    <a
      href="#root"
      onClick={(event) => {
        // Disable default scroll
        event.preventDefault();
        const rootElement = document.querySelector("#root");
        invariant(rootElement, "root element must be present");
        rootElement.scrollIntoView({ behavior: "smooth" });
      }}
    >
      Go back to top
    </a>
  );
}
