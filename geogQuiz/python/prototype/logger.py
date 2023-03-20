import logging


def get_logger():

    # Create a custom logger
    logger = logging.getLogger('handler')
    logger.setLevel(logging.INFO)

    # Create handlers
    c_handler = logging.StreamHandler()
    f_handler = logging.FileHandler('file.log', encoding='utf-8')
    c_handler.setLevel(logging.INFO)
    f_handler.setLevel(logging.INFO)

    # Add handlers to the logger
    logger.addHandler(c_handler)
    logger.addHandler(f_handler)
    return logger
