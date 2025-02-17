import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import odeint

# Constants
R = 8.314  # J/(mol·K)
A = 1e10   # Pre-exponential factor (s^-1), example value
Ea = 75000  # Activation energy (J/mol), example value

def rate_constant(T):
    """Calculate rate constant k using the Arrhenius equation."""
    return A * np.exp(-Ea / (R * T))

def dCdt(C, t, k):
    """Differential equation: first-order decay of sodium thiosulfate."""
    return -k * C

# Simulation parameters
C0 = 1.0  # normalized initial concentration
t = np.linspace(0, 300, 3000)  # time array in seconds

# Temperature range: 15°C to 55°C converted to Kelvin
temperatures_C = np.array([15, 25, 35, 45, 55])
temperatures_K = temperatures_C + 273.15

# Threshold concentration corresponding to visible turbidity (example: 0.5)
threshold = 0.5
times_to_threshold = []

for T in temperatures_K:
    k = rate_constant(T)
    C = odeint(dCdt, C0, t, args=(k,)).flatten()
    # Determine the time when concentration drops below the threshold
    idx = np.where(C <= threshold)[0]
    if idx.size > 0:
        t_threshold = t[idx[0]]
    else:
        t_threshold = t[-1]
    times_to_threshold.append(t_threshold)

# Plotting the simulation results
plt.figure(figsize=(8, 5))
plt.plot(temperatures_C, times_to_threshold, 'o-', color='blue')
plt.xlabel('Temperature (°C)')
plt.ylabel('Time to reach threshold (s)')
plt.title('Simulated Effect of Temperature on Reaction Rate')
plt.grid(True)
plt.show()
