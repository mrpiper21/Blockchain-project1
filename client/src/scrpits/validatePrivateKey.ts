const validatePrivateKey = (privateKey: string): boolean => {
	return /^[0-9a-fA-F]{64}$/.test(privateKey); // Validate length and hex format
};
