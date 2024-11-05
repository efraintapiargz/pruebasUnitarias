import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import Register from "../../app/register";
import { Alert } from "react-native";
import { useRouter } from "expo-router";

// Mock para Alert
jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

// Mock de expo-router
jest.mock("expo-router", () => ({
  useRouter: jest.fn(),
}));

describe("Register Screen", () => {
  let router;

  beforeEach(() => {
    jest.clearAllMocks();
    // Configura el mock de router en cada prueba
    router = { push: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(router);
  });

  it("renders all inputs and buttons correctly", () => {
    render(<Register />);
    expect(screen.getByTestId("input-email")).toBeTruthy();
    expect(screen.getByTestId("input-username")).toBeTruthy();
    expect(screen.getByTestId("input-password")).toBeTruthy();
    expect(screen.getByTestId("input-confirm-password")).toBeTruthy();
    expect(screen.getByTestId("register-button")).toBeTruthy();
    expect(screen.getByTestId("back-button")).toBeTruthy();
  });

  it("validates email format", () => {
    render(<Register />);
    fireEvent.changeText(screen.getByTestId("input-email"), "invalid-email");
    fireEvent.press(screen.getByTestId("register-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, corrige los errores en el formulario."
    );
  });

  it("validates required fields", () => {
    render(<Register />);
    fireEvent.press(screen.getByTestId("register-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, corrige los errores en el formulario."
    );
  });

  it("checks password requirements", () => {
    render(<Register />);
    fireEvent.changeText(screen.getByTestId("input-password"), "pass");
    fireEvent.changeText(screen.getByTestId("input-confirm-password"), "pass");
    fireEvent.press(screen.getByTestId("register-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, corrige los errores en el formulario."
    );
  });

  it("checks password match", () => {
    render(<Register />);
    fireEvent.changeText(screen.getByTestId("input-password"), "Password1!");
    fireEvent.changeText(
      screen.getByTestId("input-confirm-password"),
      "DifferentPassword!"
    );
    fireEvent.press(screen.getByTestId("register-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, corrige los errores en el formulario."
    );
  });

  it("navigates on successful registration", () => {
    render(<Register />);
    fireEvent.changeText(screen.getByTestId("input-email"), "user@test.com");
    fireEvent.changeText(screen.getByTestId("input-username"), "user123");
    fireEvent.changeText(screen.getByTestId("input-password"), "Password1!");
    fireEvent.changeText(
      screen.getByTestId("input-confirm-password"),
      "Password1!"
    );
    fireEvent.press(screen.getByTestId("register-button"));

    expect(router.push).toHaveBeenCalledWith("/");
  });

  it("navigates back when 'Atrás' button is pressed", () => {
    render(<Register />);
    fireEvent.press(screen.getByTestId("back-button"));

    expect(router.push).toHaveBeenCalledWith("/");
  });
});
