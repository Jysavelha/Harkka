/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import { auth, onAuthStateChanged, signOut } from "../firebase.js";
import Items from "../pages/Items.jsx";

jest.mock("axios");

jest.mock("../firebase", () => {
  const { mockFirebase } = require("../mockFirebase");
  return mockFirebase;
});

describe("Items", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders without crashing", async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Items />
        </BrowserRouter>
      );
    });
  });

  test("displays items from server", async () => {
    const items = [
      {
        id: 1,
        title: "Item 1",
        description: "This is item 1",
        price: 10,
        picture: "https://picsum.photos/id/1/200/200",
        contact: "contact1@example.com",
        author_id: "user1",
      },
      {
        id: 2,
        title: "Item 2",
        description: "This is item 2",
        price: 20,
        picture: "https://picsum.photos/id/2/200/200",
        contact: "contact2@example.com",
        author_id: "user2",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: items });

    await act(async () => {
      render(
        <BrowserRouter>
          <Items />
        </BrowserRouter>
      );
    });

    items.forEach((item) => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
      expect(screen.getByText(`$${item.price}`)).toBeInTheDocument();
      expect(
        screen.getByText(`Contact information: ${item.contact}`)
      ).toBeInTheDocument();
      expect(screen.getByAltText(item.title)).toBeInTheDocument();
    });
  });

  test("deletes an item when delete button is clicked", async () => {
    const items = [
      {
        id: 1,
        title: "Item 1",
        description: "This is item 1",
        price: 10,
        picture: "https://picsum.photos/id/1/200/200",
        contact: "contact1@example.com",
        author_id: "user1",
      },
      {
        id: 2,
        title: "Item 2",
        description: "This is item 2",
        price: 20,
        picture: "https://picsum.photos/id/2/200/200",
        contact: "contact2@example.com",
        author_id: "user2",
      },
    ];

    axios.get.mockResolvedValueOnce({ data: items });

    axios.delete.mockResolvedValueOnce();

    await act(async () => {
      render(
        <BrowserRouter>
          <Items />
        </BrowserRouter>
      );
    });

    const deleteButton = screen.getAllByText("Delete")[0];

    await act(async () => {
      userEvent.click(deleteButton);
    });

    expect(axios.delete).toHaveBeenCalledWith("http://localhost:8800/items/1");

    expect(window.location.reload).toHaveBeenCalled();
  });

  test("logs out when logout button is clicked", async () => {
    const items = [
      {
        id: 1,
        title: "Item 1",
        description: "This is item 1",
        price: 10,
        picture: "https://picsum.photos",
      },
    ];
  });
});
