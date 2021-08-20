/**
 * @jest-environment jsdom
 */
import React from "react";
import Configure from "../../../Components/Configure";
import { render, cleanup } from "@testing-library/react";
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    fetch.resetMocks();
    container = document.createElement("div");
    let url = "https://one.wordpress.test";
    container.innerHTML = `
		<input type="hidden" id="ajaxURL" value="${url}" />
		<input type="hidden" id="ajaxSecurity" value="ajaxSecurity" />
	`;
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("Configure: if no data was passed", async () => {
    fetch.mockResponseOnce(
        JSON.stringify({
            data: {
                configure: '',
            },
        }).toString()
    );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<Configure />, container);
    });
    expect(document.querySelector("#useCompanyLogo").checked).toBe(true);
    expect(document.querySelector("textarea").value).toBe("");
});

it("Configure: It renders fetched title and decription", async () => {
    fetch.mockResponseOnce(
        JSON.stringify({
            data: {
                configure: '{"metaInfo":{"title":"Meta Titlesad","description":"Meta Description"},"companyBranding":true}',
            },
        }).toString()
    );
    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
        render(<Configure />, container);
    });
    expect(document.querySelector("#useCompanyLogo").checked).toBe(true);
    expect(document.querySelector("textarea").value).toBe("Meta Description");
	document.querySelector('button').click();
});

