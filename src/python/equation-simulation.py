import numpy as np
import matplotlib.pyplot as plt

# Constants
R = 8.314       # J/(mol·K)
A = 1e10        # s^-1, pre-exponential factor
Ea = 60000      # J/mol, activation energy

# Temperatures (°C) and conversion to Kelvin
temperatures_C = np.array([15, 25, 35, 45, 55])
temperatures_K = temperatures_C + 273.15

# Calculate rate constants for each temperature
k_values = A * np.exp(-Ea / (R * temperatures_K))

# Calculate time to reach 50% concentration (C = 0.5 * C0)
t_threshold = 0.693 / k_values

# Display computed values
for T, k, t in zip(temperatures_C, k_values, t_threshold):
    print(f"Temperature: {T} °C, k: {k:.3f} s^-1, t_threshold: {t:.3f} s")

# Plotting
plt.figure(figsize=(8, 5))
plt.plot(temperatures_C, t_threshold, 'o-', color='blue', label='Time to 50%')
plt.xlabel('Temperature (°C)')
plt.ylabel('Time to reach threshold (s)')
plt.title('Expected Effect of Temperature on Reaction Time')
plt.grid(True)
plt.legend()
plt.show()
