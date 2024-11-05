import * as React from "react";
import { fireEvent, render, screen } from "@testing-library/react-native";
import Index from "../../app/index";
import { Alert } from "react-native";

beforeEach(() => {
    jest.clearAllMocks(); // Limpia las llamadas anteriores de Alert.alert
  });

jest.mock("react-native/Libraries/Alert/Alert", () => ({
  alert: jest.fn(),
}));

describe("Index", () => {
  it("renders correctly", () => {
    render(<Index />);
    expect(screen.getByPlaceholderText("Correo Electrónico")).toBeTruthy();
    expect(screen.getByPlaceholderText("Contraseña")).toBeTruthy();
    expect(screen.getAllByText("Iniciar Sesión").length).toBeGreaterThan(0);
    expect(screen.getByText("Registrarse")).toBeTruthy();
    expect(screen.getByTestId("icon-image")).toBeTruthy();
  });

  it("validates email", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const button = screen.getByTestId("login-button"); // Cambiado a getByTestId
    fireEvent.changeText(emailInput, "user@");
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error de validación",
      "Por favor, verifica los datos ingresados",
      [{ text: "OK" }],
      { cancelable: false }
    );
  });

  it("validates password", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByTestId("login-button");
    
    fireEvent.changeText(emailInput, "user@test.com");
    fireEvent.changeText(passwordInput, "password");
    fireEvent.press(button);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error de validación",
      "La contraseña debe tener al menos 8 caracteres, una mayúscula y un símbolo especial",
      [{ text: "OK" }],
      { cancelable: false }
    );
  });

  it("submits the form", () => {
    render(<Index />);
    const emailInput = screen.getByPlaceholderText("Correo Electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const button = screen.getByTestId("login-button"); // Cambiado a getByTestId
    fireEvent.changeText(emailInput, "user@test.com");
    fireEvent.changeText(passwordInput, "Password1!");
    fireEvent.press(button);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Éxito",
      "Inicio de sesión exitoso",
      [{ text: "OK", onPress: expect.any(Function) }],
      { cancelable: false }
    );
  });
});
