def extraer_coeficientes(expr):
    expr = expr.replace(" ", "").lower()
    if 'x' not in expr:
        return 0.0, float(expr)
    if expr.startswith('x'): expr = '1' + expr
    if expr.startswith('-x'): expr = '-1' + expr
    x_index = expr.find('x')
    m_str = expr[:x_index]
    b_str = expr[x_index+1:] if x_index+1 < len(expr) else '0'
    m = float(m_str)
    b = float(b_str) if b_str else 0.0
    return m, b

def pedir_funciones_texto():
    funciones = []
    print("\nAhora, ingrese dos funciones en formato y = mx + b (ej: -2x+5)")
    for i in range(2):
        while True:
            texto = input(f"Ingrese la función de línea {i+1}: ")
            try:
                funciones.append(extraer_coeficientes(texto))
                break
            except Exception as e:
                print(f"Error en el formato: {e}. Inténtelo de nuevo.")
    return funciones

def pedir_restricciones_texto():
    restricciones = []
    print("Ingrese las restricciones del problema (ej: x+y<=15, x>=5).")
    print("Deje la línea en blanco y presione Enter para terminar.")
    i = 1
    while True:
        texto = input(f"Restricción {i}: ")
        if not texto:
            break
        restricciones.append(texto.replace(" ", "").lower())
        i += 1
    return restricciones

def cumple_restricciones(x, y, restricciones):
    for r in restricciones:
        try:
            if not eval(r):
                return False
        except NameError:
            print(f"Error: La restricción '{r}' no es válida.")
            return False
    return True

def graficar_combinado(funciones, restricciones):
    print("\n" + "="*60)
    print("Visualización Combinada: Funciones (1, 2) y Región Factible (*)")
    print("="*60 + "\n")
    for y_coord in range(15, -3, -1):
        linea = f"{y_coord:3d}| "
        for x_coord in range(-2, 21):
            x = x_coord
            y = y_coord
            simbolo = ' '
            if cumple_restricciones(x, y, restricciones):
                simbolo = '*'
            for idx, (m, b) in enumerate(funciones):
                if abs((m * x + b) - y) < 0.5:
                    simbolo = str(idx + 1)
            if x == 0 and y == 0:
                simbolo = '+'
            elif x == 0 and simbolo == ' ':
                simbolo = '|'
            elif y == 0 and simbolo == ' ':
                simbolo = '-'
            linea += simbolo
        print(linea)
    print("   +" + "-" * 23)

if __name__ == "__main__":
    lista_de_restricciones = pedir_restricciones_texto()
    
    if not lista_de_restricciones:
        print("No se ingresaron restricciones. Saliendo del programa.")
    else:
        funciones_usuario = pedir_funciones_texto()
        graficar_combinado(funciones_usuario, lista_de_restricciones)
